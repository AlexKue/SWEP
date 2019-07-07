#!/bin/bash
# generate key before executing, see https://letsencrypt.org/docs/certificates-for-localhost/ (see gitignore for details in case of "untrusted certificate" error in Chrome)
thin start -C config/thin_https.yml --ssl --ssl-key-file localhost.key --ssl-cert-file localhost.crt
