let lib = require('bindings')('s2js');
let { applyEnums } = require('./src/js/helpers');

let s2js = {};

applyEnums(s2js, require('./src/js/races'), 'RACES');
applyEnums(s2js, require('./src/js/unitTypes'), 'UNIT_TYPES');
applyEnums(s2js, require('./src/js/unitClasses'), 'UNIT_CLASSES', 'UNIT_CLASS_IDS');
applyEnums(s2js, require('./src/js/abilities'), 'ABILITIES', 'ABILITY_IDS');
applyEnums(s2js, require('./src/js/buffs'), 'BUFFS');
applyEnums(s2js, require('./src/js/upgrades'), 'UPGRADES');

let addParticipant = {
    bot: lib.AddBot,
    computer: lib.AddComputer
};

Object.assign(s2js, {
    StartGame: function(options) {
        options.participants.forEach(p => {
            addParticipant[p.type](p.race);
        });
        lib.StartGame(options.map);
    },
    GetGameStatus: lib.GetGameStatus,
    Update: lib.Update,
    GetStats: lib.GetStats,
    GetUnits: lib.GetUnits,
    GetUnitClasses: lib.GetUnitClasses,
    GetUnitInfo: lib.GetUnitInfo,
    GetResourceInfo: lib.GetResourceInfo,
    CommandUnit: lib.CommandUnit
});

module.exports = s2js;
