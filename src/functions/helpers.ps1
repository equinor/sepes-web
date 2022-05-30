class MyMenuOption {
    [String]$DisplayName
    [ScriptBlock]$Script

    [String]ToString() {
        Return $this.DisplayName
    }
}

function New-MenuItem([String]$DisplayName, [ScriptBlock]$Script) {
    $MenuItem = [MyMenuOption]::new()
    $MenuItem.DisplayName = $DisplayName
    $MenuItem.Script = $Script
    Return $MenuItem
}

function ClearLines([int32]$Count=7) {

    $CurrentLine  = $Host.UI.RawUI.CursorPosition.Y
    $ConsoleWidth = $Host.UI.RawUI.BufferSize.Width

    $i = $Count
    for ($i; $i -le $CurrentLine; $i++) {
	
	    [Console]::SetCursorPosition(0,($Count))
	    [Console]::Write("{0,-$ConsoleWidth}" -f " ")

    }

    [Console]::SetCursorPosition(0,($Count))
}

function DrawLine([int]$x, [int]$y, [int]$length){
    [Console]::SetCursorPosition($x,$y)

    $linechar="-"
    $vert=0
    $horz=1

    foreach ($count in 0..($length-1)) { 
        [Console]::SetCursorPosition((($horz*$count)+$x), (($vert*$count)+$y))
        write-host $linechar -nonewline
    }

    $count++
    [Console]::SetCursorPosition(0,$y)
} 