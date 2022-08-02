# This script uses Gource (https://gource.io/) to show a visualisation of the project progress

video_target="$1"

# set visualisation duration
visualisation_duration_seconds=$(( 60 * 5 )) # 5min
# visualisation_duration_seconds=$(( 10 )) #  10s

# find script directory & get filename of captions file
dir="$(dirname -- "$( readlink -f -- "$0"; )";)";
captions_filename="$dir"/.gource_captions.txt

# find first & last commit timestamp to calculate project age
first_commit_timestamp=$(git log dev --reverse --format="%at" | head -1)
last_commit_timestamp=$(git log dev --format="%at" -n 1)

# get project age in days
time_diff_seconds=$((last_commit_timestamp - first_commit_timestamp))
days=$(((time_diff_seconds / (60 * 60 * 24)) + 1))

# get "seconds per day" in visualisation (multiplied with factor 1000 as bash does not support floats)
seconds_per_day_times_1000=$((1000 * visualisation_duration_seconds / days))
seconds_per_day_times_1000_length=${#seconds_per_day_times_1000}
while ((seconds_per_day_times_1000_length < 3));
do
    seconds_per_day_times_1000='0'$seconds_per_day_times_1000
    seconds_per_day_times_1000_length=${#seconds_per_day_times_1000}
done

# generate "seconds per day" as float (3 decimal digits)
seconds_per_day_times_1000_length_3_less=$((seconds_per_day_times_1000_length - 3))
seconds_per_day=${seconds_per_day_times_1000:0:seconds_per_day_times_1000_length_3_less}'.'${seconds_per_day_times_1000: -3}

# generate static captions
echo "$first_commit_timestamp"'|('"$(date --date='@'"$first_commit_timestamp" +%x)"') First commit' > "$captions_filename"
{
    echo '1603490400|('"$(date --date='@1603490400' +%x)"') Start of Beta-Testing'
    echo '1605913200|('"$(date --date='@1605913200' +%x)"') First public Release'
} >> "$captions_filename"

# generate release captions
git log --reverse --no-walk --tags --date="format:%x" --pretty="%at|(%ad) %(describe:tags)" --since=1605913464 | grep -E "v\.?4(\.[0-9]+){2}$" | sed -r 's/v\.?4\./Release: v4./g' >> "$captions_filename"

# show visualisation with gource
gource_options=(
    -f
    --key
    --title "LSS-Manager V.4"
    --seconds-per-day "$seconds_per_day"
    --caption-file "$captions_filename"
)

if [ ${#video_target} = 0 ]; then
    gource "${gource_options[@]}"
else
    gource "${gource_options[@]}" -o - | ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i - -vcodec libx264 -preset ultrafast -pix_fmt yuv420p -crf 1 -threads 0 -bf 0 "$video_target"
fi

# delete the captions file as we don't need it anymore
rm "$captions_filename"
