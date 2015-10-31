FROM nginx:1.9.6

ADD . /usr/share/nginx/html

CMD ["/usr/share/nginx/html/runner"]
