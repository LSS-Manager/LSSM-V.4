import diff from '../components/diff.vue';

const noteArea = document.getElementById('note_message');
const notesBefore = noteArea.value.toString();

const diffBtn = document.createElement('button');
diffBtn.classList.add('btn', 'btn-default');
diffBtn.textContent = 'Diff';
// diffBtn.disabled = true;
document.querySelector('.form-actions').appendChild(diffBtn);
diffBtn.addEventListener('click', event => {
    event.preventDefault();
    const notesCurrent = noteArea.value.toString();
    window.lssmv4.$modal.show(
        diff,
        {
            before: notesBefore,
            current: notesCurrent,
        },
        {
            name: 'diff',
            height: '96%',
            width: '96%',
        }
    );
});
