## Description

Playground for a simple service deployed on Kubernetes using Skaffold
Frontend with VueJs

## Try it out

```bash
# docker
$ docker-compose up -d
```

```bash
# minikube
$ skaffold dev -p dev
```

There are three parts to the puzzle:
1. ui runs on port 7070
2. order runs on port 8080
3. payment runs on port 9090
