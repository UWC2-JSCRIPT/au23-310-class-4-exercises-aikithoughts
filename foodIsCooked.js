/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  if (kind === 'chicken') {
    if (internalTemp > 165) {
      return true;
    } else {
      return false;
    }
  } else if (kind === 'beef') {
    if (internalTemp > 138 && doneness === 'well') {
      return true;
    } else if (internalTemp === 138 && doneness === 'medium') {
      return true;
    } else if (internalTemp < 138 && doneness === 'rare') {
      return true;
    } else {
      return false;
    }
  }
};



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true