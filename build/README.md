To achieve a working build, the following files are required:

**files**:
* `/static/db_access.php` containing following variables having DB-Connection information:
    * `$db_user`
    * `$db_pass`
    * `$db_name`
* `/static/.configs.json` containing minimum following required keys:
    * `discord_webhook_url` *may be an empty string*
* `/static/.check_request.php` verifying the incoming request and dies if not verified.
    * For security reasons, this file is ignored in git-repository. The host is responsible for providing a security level via this file.
