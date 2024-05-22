# LeeTu Shop VueJS

Back End Laravel: https://github.com/leetuls/leetu-laravel/tree/feature_leetu_shop

## Demo Fronend AWS Amplify

store front: https://master.d66jn4ue2xk7a.amplifyapp.com/

admin: https://master.d66jn4ue2xk7a.amplifyapp.com/admin
       
       email: test_admin@gmail.com
       password: 123456

## Backend build on AWS EC2

1) Get started with Amazon EC2 Linux instances: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html
2) ssh to instance:
       2.1) create key pairs: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-to-linux-instance.html
       2.2) save file name_key.pem on local
       2.3) ssh to instance on windown or linux: ssh -i "path_to_key_pairs" <username>@<public_ip_or_public_dns>
3) install tool (trường hợp không dùng docker)
       3.1) clone source BE from https://github.com/leetuls/leetu-laravel/tree/feature_leetu_shop to /var/www/html on instance
   
       3.2) install nginx, mysql server, composer
              sudo apt update
              sudo apt install -y nginx
              sudo apt install php8.1
              sudo apt install php8.1-fpm
              sudo apt install php8.1-common php8.1-mysql php8.1-xml php8.1-xmlrpc php8.1-curl php8.1-gd php8.1-imagick php8.1-cli php8.1-dev php8.1-imap php8.1-mbstring php8.1-opcache php8.1-soap php8.1-zip php8.1-redis php8.1-intl -y
              sudo apt-get install mysql-server
              sudo apt install -y composer
   
       3.3) cd đến /var/www/html/<folder_source_laravel>:
              composer update
              composer install --optimize-autoloader --no-dev
              php artisan migrate
              php artisan key:generate
              php artisan config:cache
              php artisan route:cache
              php artisan view:cache
              sudo chmod -R 775 public && sudo chmod -R 777 storage
   
       3.4) nginx config:
              Tạo file cấu hình trong thưc mục của instance: /etc/nginx/sites-available/<your_domain>:
   
              server {
                  listen 80;
                  listen [::]:80;
                  server_name <your_domain>; #change with your domain
                  root /var/www/html/leetu-laravel/public;

                  add_header X-Frame-Options "SAMEORIGIN";
                  add_header X-Content-Type-Options "nosniff";

                  index index.php;

                  charset utf-8;

                 location / {
                      try_files $uri $uri/ /index.php?$query_string;
                 }

                 location = /favicon.ico { access_log off; log_not_found off; }
                 location = /robots.txt  { access_log off; log_not_found off; }

                 error_page 404 /index.php;

                 location ~ \.php$ {
                      fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
                      fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
                      include fastcgi_params;
                 }

                  location ~ /\.(?!well-known).* {
                      deny all;
                 }
              }

              kích hoạt file cấu hình virtual host mới tạo, hãy tạo một symbolic link đến <your_domain> trong sites-enable:

              sudo ln -s /etc/nginx/sites-available/<your_domain> /etc/nginx/sites-enabled/

          3.5) đăng kí ssl certificate dùng Let's Encrypt(hàng free) => để không bị chặn khi amplifyapp gọi api có url http://
                 Nếu dùng domain của aws dạng ...amazonaws.com => sẽ không dùng được hàng free này => trên AWS có thể đăng kí sử dụng [AWS Certificate Manager]
                 Nếu không muốn đăng kí SSL cho ...amazonaws.com thì có thể dùng [CloudFront] của AWS => sẽ tạo ra 1 domain mới trỏ đến public DNS EC2 của bạn ...amazonaws.com sẽ có sẵn chứng chỉ SSL

    

