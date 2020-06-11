# Project Description
Nam Pham, Jeeyoung Kim (INFO 441)

### Non-technical Description of the project
We want to create a platform in which people can play a Pokémon battles to catch pokemon and view pokemon's statistics. Main features of this game are the following: <br>
* Players can catch a Pokemon using pokeballs they have, allowing them to feel a sense of ownership.
* By catching Pokemon, they can add it to their dex and their team
* Players can view complete pokemon information of pokemon in their dex 
* Players can use item to level up pokemons in their current team. If the pokemon evolves, the evolution is also added to the dex.

*We think developing game logic would be the most challenging part* 

The target audience of our application is anyone who enjoys gaming. Additionally, there is a frustration regarding currently existing Pokemon games that prevent users from storing Pokemon that they caught by winning in a battle. With our application, players can store Pokemon that they caught and view their information in Pokedex.

We want to create this application because we want to help those around us stay entertained. Due to the time being, there is uncertainty and anxiety which makes some of us deal with immense amounts of stress. Social distancing prevents us from interacting with others and spending time with friends and family that we used to. This can take a huge toll on people’s mental health by creating a sense of isolation. For this reason, we want to build a pokemon game that everyone knows and enjoys and may remind people of good old days.

### Technical Description
![data flow chart](./img/flowchart4.png)



### Summary of User Table
|Priority| User | Description | Technical implementation strategy |
| :------------- | :------------- | :------------- |:------------- |
|P0| As a player |As a user, I want to be able to log in to my account and continue where I left off. | Store log in credentials in database, authenticate user and store sessions inside Redis database.|
|P3| As a player |As a user, I expect the game to execute the moves I chose correctly. | Send over move details through WebSockets, and update the game state in the backend, accordingly and send back data to both clients.|
|P0| As a player |As a user, I want to catch as many pokemons as I can using the Pokeball I has.| Send GET request to /catch/ endpoint|
|P1| As a player |As a player, I want to see my Pokemon’s stat, as well as the types, power, and accuracy of their moves.|GET request to fetch Pokemon’s data.|
|P0| As a player |As a player, I want to be able to see my team |GET request to the MongoDB instance to see your team. |
|P0| As a player |As a player, I want to be able to see a specific pokemon in my team |GET request to the /team/ endpoint which connects to a MongoDB instance to see your team. |
|P0| As a player |As a player, I want to be use item on pokemon on my team | POST request to the /team/ endpoint. |
