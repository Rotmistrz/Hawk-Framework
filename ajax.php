<?php

if($_POST['action'] == 'load-overlayer') {
    header('Content-type: application/json');
    
    $result['html'] = "Lorem ipsum dolor sit amet";
    $result['anchor'] = "n_1-lorem-ipsum";
    
    echo json_encode($result);
}

?>