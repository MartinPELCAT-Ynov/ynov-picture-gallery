# Application de partage de ses photos de voyage(s).

Un système de validation du compte par l’envoi d’un email avec un lien à cliquer sera effectuélors de l’inscription d’un utilisateur.

Une fois inscrit, on pourra créer des voyages dans notre espace.

Pour chaque voyage, on pourra uploader une collection de photos.

Ensuite, cette collection ne sera pas publique par défaut. On pourra la rendre publique, ou bien enregistrer des adresses email à qui on enverra un lien d’accès à la galerie protégée.

Pour chaque photo, on pourra générer des miniatures pour l’affichage en liste.

Également, on aura la possibilité d’envoyer les images sur un espace de stockage externe, comme S3 par exemple. L’implémentation n’est pas obligatoire, mais doit pouvoir être intégrée à l’application de manière simple.

On pourra aussi ajouter une carte dans l’interface, pour chaque voyage.

En effet, une évolution de ce projet pourrait être d’associer un voyage à plusieurs destinations, qui apparaîtraient alors sur une carte.

Pour chaque destination, on pourrait associer des dates de visite(arrivée / départ), ainsi que plusieurs images venant illustrer la destination.

Une destination correspondrait à une ville, située dans un pays.On pourrait alors définir des voyages traversant plusieurs pays.

Enfin, une autre évolution du projet serait l’ajout d’un système de«likes»etcommentaires sur un voyage(ou une destination, ou une image), par d’autres utilisateurs enregistrés.

# Technos

- Tailwindcss
- NextJs
  - Koa
  - TypeORM
- GraphQL
  - Type-GraphQL
  - Apollo Server

# Entities

```typescript
export class User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  travels: Travel[];
}

export class Travel implements Reaction {
  uuid: string;
  albums: Album[];
  name: string;
  description: string;
  destinations: Destination[];
}

export class Album implements Reaction {
  uuid: string;
  public: boolean;
  photos: photo[];
  albumInvitations: AlbumInvitation[];
}

export class Photo implements Reaction {
  uuid: string;
  url: string;
}

export class AlbumInvitation {
  album: Album;
  email: string;
}

export class Destination implements Reaction {
  uuid: string;
  name: string;
  arrivalDate: Date,
  departureDate:Date,
  location: any; //Voir comment faire: geohash ou longitude et latitudes
  illustrations: Photo[]
}

export interface Reaction {
    likes: Like[]
    comments: Comment[]
}

export class Like {
    user: User
}

export class Comment {
    user: User
    content: string
}
```

# TODO

- **`Inscription`**

  - `input`:
    - firstName: string
    - lastName: string
    - email: string
    - password: string
  - Envoyer un mail

- **`Connexion`**

  - `input`:
    - email: string
    - password: string

- **`Creation de voyage`**

  - Upload des photos
  - Preparer un connecteur pour un upload sur un serveur (s3, firebase)

- **`Affichage des photos`**
  - en liste avec miniatures
  - Afficher une carte dans les voyages
