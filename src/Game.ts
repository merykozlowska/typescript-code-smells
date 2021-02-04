export class Game {
    private _lastSymbol: string = ' ';
    private _board: Board = new Board();
    private _emptySymbol: string = ' ';

    public Play(tile:Tile) : void {
        // ! comments
        //if first move
        if (this._lastSymbol == this._emptySymbol) {
            //if player is X
            if (tile.Symbol == 'O') {
                throw new Error("Invalid first player");
            }
        }
        //if not first move but player repeated
        else if (tile.Symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        }
        //if not first move but play on an already played tile
        else if (this._board.SymbolAt(tile.X, tile.Y) != this._emptySymbol) {
            throw new Error("Invalid position");
        }

        // update game state
        this._lastSymbol = tile.Symbol;
        this._board.AddTileAt(tile);
    }

    private IsRowPlayed(x:number):boolean{
        return this._board.SymbolAt(x, 0) != this._emptySymbol &&
            this._board.SymbolAt(x, 1) != this._emptySymbol &&
            this._board.SymbolAt(x, 2) != this._emptySymbol
    }

    private AreRowsSame(x:number):boolean{
        return this._board.SymbolAt(x, 0) ==
            this._board.SymbolAt(x, 1) &&
            this._board.SymbolAt(x, 2) == this._board.SymbolAt(x, 1)
    }

    // ! long method
    // ! duplication
    public Winner() : string {
        //if the positions in first row are taken
        // ! Message chain
        // ! Data clump
        // ! Feature envy (?)
        for (let i=0; i<3;i++){
            if (this.IsRowPlayed(i) && this.AreRowsSame(i)) {
                    return this._board.SymbolAt(i, 0);
            }
        }
        return ' ';
    }

}

// ! Data class (?)
export interface Tile
{
    X: number;
    Y: number;
    Symbol: string;
}

class Board
{
    private _plays : Tile[] = [];

    constructor()
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                const tile : Tile = {X :i, Y:j, Symbol:" "};
                this._plays.push(tile);
            }
        }
    }

    // public TileAt(x:  number, y: number): Tile {
    //     return this._plays.find((t:Tile) => t.X == x && t.Y == y)!
    // }

    public SymbolAt(x:  number, y: number): string {
        return this._plays.find((t:Tile) => t.X == x && t.Y == y)!.Symbol;
    }

    // ! Long parameter list (?)
    public AddTileAt(tile:Tile) : void
    {
        // !  Dead code
        //  const tile : Tile = {X :x, Y:y, Symbol:symbol};

        this._plays.find((t:Tile) => t.X == tile.X && t.Y == tile.Y)!.Symbol = tile.Symbol;
    }
}
