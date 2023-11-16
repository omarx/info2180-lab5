<?php

$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

if (isset($_GET['country'])) {
    $country = htmlspecialchars($_GET['country']);
    $lookupType = isset($_GET['lookup']) ? $_GET['lookup'] : 'countries';

    if ($lookupType === 'cities') {

        $stmt = $conn->prepare("SELECT cities.name, cities.district, cities.population 
                                FROM cities 
                                JOIN countries ON countries.code = cities.country_code 
                                WHERE countries.name LIKE :country");
    } else {
        $stmt = $conn->prepare("SELECT * FROM countries WHERE name LIKE :country");
    }

    $stmt->bindValue(':country', "%$country%");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
    exit;
} else {
    $results = [];
}

?>

