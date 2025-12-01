keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android | Out-File -Encoding ascii keytool_out.txt
