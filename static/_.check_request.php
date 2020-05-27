<?php
header('Access-Control-Allow-Headers: content-type, X-LSS-Manager, X-LSSM-User');
// deny the user access if provided arguments not matching.
// die with {error: "outdated version", version: currentVersion} if user is outdated
