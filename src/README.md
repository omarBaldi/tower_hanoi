## TOWER OF HANOI

### Description

The user will be prompted with 3 different lines
corresponding to the hanoi towers. The main goal of the
game is being able to successfully stack in the same exact
order the items in the last (third) tower.

### Data structures / logic needed

Keeping in mind the fact that the user is not allowed to move
the items placed underneath the first one, it makes sense to
use a STACK data structure (using .push and .pop).

Therefore I think it would make sense to use a Map data structure
that stores as a key the hanoi tower id and as a value instead
the array containing the items. As soon as the user will start dragging
the item on top of the stack, I need to keep track of the item moved
as well as the tower from where he was dragged from.
