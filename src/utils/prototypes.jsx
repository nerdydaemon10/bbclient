const prototypes = {}

prototypes.init = function() {
    String.prototype.isEmpty = function() {
        return !this.trim()
    }
    String.prototype.isNotEmpty = function() {
        return this.replace(" ", "").length > 0
    }
    
    /**
     * @method not
     * @description negates the boolean value
     * 
     * @returns {boolean}
     */
    Boolean.prototype.not = function() {
        return !this
    }
}

export default prototypes