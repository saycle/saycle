var dal = require("./DAL");
var guid = require("./Guid");
var Entity = (function () {
    function Entity() {
    }
    return Entity;
})();
exports.Entity = Entity;
var EntityController = (function () {
    function EntityController() {
    }
    EntityController.getEntities = function (type, callback) {
        dal.runQuery("SELECT * FROM entities WHERE type = $1", [type], function (queryResult) {
            var entities = queryResult.rows;
            // Append all values to entities
            dal.runQuery("SELECT * FROM values", [], function (queryResult) {
                var values = queryResult.rows;
                entities.forEach(function (entity, i) {
                    entity.values = {};
                    var currentValues = values.filter(function (a) { return a.entityid == entity.id; });
                    currentValues.forEach(function (v, i) {
                        entity.values[v.language] = v.values;
                    });
                });
                callback(entities);
            });
        });
    };
    ;
    EntityController.addEntity = function (type, entity, callback) {
        var newEntityGuid = guid.Guid.newGuid();
        entity.id = newEntityGuid;
        dal.runQuery("INSERT INTO entities (id, type) VALUES ($1, $2)", [newEntityGuid, type], function () {
            EntityController.updateEntity(entity, function () {
                callback();
            });
        });
    };
    EntityController.updateEntity = function (entity, callback) {
        // Update / insert all values of the entity
        dal.runQuery("DELETE FROM values WHERE entityid = $1", [entity.id], function () {
            Object.keys(entity.values).forEach(function (v, i) {
                dal.runQuery("INSERT INTO values (entityid, language, values) VALUES ($1, $2, $3)", [entity.id, v, entity.values[v]], callback);
            });
        });
    };
    ;
    return EntityController;
})();
exports.EntityController = EntityController;
//# sourceMappingURL=EntityController.js.map