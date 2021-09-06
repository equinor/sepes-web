$currentCoverage=$args[0]
$previousCoverage=$args[1]

$currentCoverage2 = $currentCoverage -replace "%",'';
$previousCoverage2 = $previousCoverage -replace "%",'';

if ($currentCoverage2 -eq $previousCoverage2) {
    return "Coverage has not changed (" + $currentCoverage + "%)";
}
if ($currentCoverage2 -gt $previousCoverage2) {
    return 'Coverage has increased by (' + ($currentCoverage2 - $previousCoverage2) + "%)";
}
else {
    return 'Coverage has decreased by (' +( $previousCoverage2 - $currentCoverage2) + "%)";
}