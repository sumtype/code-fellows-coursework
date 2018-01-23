#REST API - Force Balance

This REST API uses three resources, two of which represent two sides with units which have a name, a health value, a damage range, and an accuracy rating.  These two resources have CRUD functionality for adding, deleting, viewing, and updating their units.

The third resource returns the balance of the force based on the number of battles each side wins.  Wins are calculated by having the first member of each side attack one another until one, or both, are defeated.  When this occurs the next Jedi on a defeated side begins attacking the victor (or new combatent) of the other side until only one side remains.

###Usage

####http://localhost:[PORT]/api/balance

Returns an object containing the complete arrays of the light side Jedi, dark side Jedi, and neutral/civilian Jedi.

####http://localhost:[PORT]/api/balance/[numberOfBattles]

Returns the current balance of the force based on the Jedi comprising the light and dark sides in battle.  Specify the [numberOfBattles] you'd like the sides to perform before the balance is determined.  Each battle begins with both sides at full strength.

####http://localhost:[PORT]/api/light

Returns an array containing all the light side Jedi if sent a GET request, creates a new Jedi if sent a POST request.  Send a Jedi object with your POST request if you do not want a default Jedi to be created (default Jedi are neutral and named Civilian).

####http://localhost:[PORT]/api/light/[id]

Deletes the Jedi with the specified [id] if sent a DELETE request, updates the information of the Jedi with the specified [id] if sent an UPDATE request and a Jedi property or properties with new values.

####http://localhost:[PORT]/api/dark

Returns an array containing all the dark side Jedi if sent a GET request, creates a new Jedi if sent a POST request.  Send a Jedi object with your POST request if you do not want a default Jedi to be created (default Jedi are neutral and named Civilian).

####http://localhost:[PORT]/api/dark/[id]

Deletes the Jedi with the specified [id] if sent a DELETE request, updates the information of the Jedi with the specified [id] if sent an UPDATE request and a Jedi property or properties with new values.

###Notes

If you try to create a Jedi with damage, health, or accuracy parameters outside their min/max range, our database validation will notice and instead create your Jedi with default value damage, health, and accuracy parameters (which are well below their allowed max values).

#####Author: [James Mason](https://github.com/sumtype)
