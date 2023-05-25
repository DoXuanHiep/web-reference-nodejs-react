FROM mysql:8.0.33-oracle
LABEL "Project"="Vprofile"
LABEL "Author"="HIEP"

ENV MYSQL_ROOT_PASSWORD="admin"
ENV MYSQL_DATABASE="messages"


ADD message.sql docker-entrypoint-initdb.d/message.sql