$currentCoverage=$args[0]
$previousCoverage=$args[1]

if ($currentCoverage -eq $previousCoverage) {
    return "Coverage has not changed (" + $currentCoverage + "%)";
}
if ($currentCoverage -gt $previousCoverage) {
    return 'Coverage has increased by (' + ($currentCoverage - $previousCoverage) + "%)";
}
else {
    return 'Coverage has decreased by (' +( $previousCoverage - $currentCoverage) + "%)";
}