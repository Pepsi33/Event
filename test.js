const event = require('./index');

event.listen('a', function(a, b, c){
    console.log(`处罚了----a:${a}---b:${b}---c:${c}-`);
});

event.emit('a', 1, 2, 3);