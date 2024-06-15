👷This PJ is a wip

# About "WeatCast"
This is an application that you can see today's Vancouver weather forecast and find the outfits that match the weather!
You can post your outfits yourself, or get inspiration from others' outfits of the day.



# Language and Libraries
- Vue3
- TypeScript
- Vuetify
- Firebase (Auth, Firestore, Storage)
- axios
- [Weatherbit](https://www.weatherbit.io/)

Vue3 allows us to efficiently build scalable and maintainable applications, leveraging its Composition API.

Also, I chose Firestore for its high query flexibility, and because real-time updates, which aren't necessary for this application, are not a concern.

# Application Structure

```
src/
│
├── components/        # Shared components
│   ├── UI/              # pure UI components (Button, Modal)
|   |    ├── Button, Modal, IconButton              
│   └── Layout/          # Layout components (Header, Footer)
|        ├── Header
│ 
|─── pages/              # Feature Element
│   ├── Home/            
│   │   ├── components/  # Home specific components 
│   │   ├── compositions/# Utility function related to business logic (involving state, etc.)
│   │   └── modules/     # Utility function (independent of any specific dependencies.)
├─ compostions/         # Grobal custome hook
│
├─ utils/             # Grobal utility function
│
│
│
└─ styles/              # Shared styles
```
