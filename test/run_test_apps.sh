cd /opt/bitnami/apps/test
pm2 start test.js --name first_test_app

cd /opt/bitnami/apps/test2
pm2 start test.js --name second_test_app