# This design is an improvment because it can be tested without an interface and can be tested easily.
# Moving our scoring system to JS instead of python
# Can be implemented in the front-end or the back-end

def coords_to_string(coords, resources):
    # coords = list of pairs (selected coords), resources = list of strings of resources at coords

    # Find minimum row, maximum row, minimum column, maximum column
    # Create a rectangular string of the resources, and return that string
    # ex : d = {'BGI.W' : 'cottage'}
    # see if it mathches any in dictionary, if it does, light up a buillding that can be built
    # build in elligible spot, clear out coords

    # with unique buildings, delete their recipe from the dictionary because you can only build one
    return 0

coords_to_string([[2,2], [2,3] [3,3]], ['B', 'G', 'W'])


def calc_score(board):
    # board = 16char string
    # turn board into 2d grid

    # score each individual element
    score = 0
    score += score_empty(board)
    score += score_well(board)
    score += score_farm(board)




    return 0

def score_well(board):
    return 0


def score_farm(board):
    return 0

def score_empty(board):
    # Cathedral edge case
    if 'C' in board:
        return 0
    else:
        # logic
        return 0