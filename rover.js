class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let results = [];


      for (let command of message.commands) {
         let result = {};


         if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            result.completed = true;
         } else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               result.completed = false;
            } else {
               this.position = command.value;
               result.completed = true;
            }
         } else if (command.commandType === 'STATUS_CHECK') {
            result.completed = true;
            result.roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            };
         }


         results.push(result);
      }

   
      return {
         message: message.name,
         results: results
      };
   }
}

module.exports = Rover;