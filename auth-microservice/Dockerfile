FROM adoptopenjdk/openjdk11-openj9:alpine-jre
COPY rootCA.crt /tmp/
RUN keytool -import -noprompt -v -trustcacerts -file /tmp/rootCA.crt -cacerts -storepass changeit -alias nyomio
COPY nyomio-auth-microservice-*-all.jar auth.jar
EXPOSE 8080
CMD java -XX:+UnlockExperimentalVMOptions -Dcom.sun.management.jmxremote \
    -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000 \
    -jar auth.jar
