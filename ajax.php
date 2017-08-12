<?php

if($_POST['action'] == 'load-overlayer') {
    sleep(2);

    header('Content-type: application/json');
    
    $result['html'] = "
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a pretium neque. Donec ut tortor sed justo dictum sollicitudin congue ac mi. Pellentesque convallis nunc quis tincidunt mattis. Phasellus eget neque posuere, imperdiet nisi at, aliquet purus. Proin a mollis sapien, non tristique nisi. Aenean in est viverra, egestas nisl a, malesuada magna. Vestibulum ac ante rutrum, mollis lacus ac, mollis dolor. Aenean eget tempor nulla. Maecenas posuere mollis bibendum. Nunc faucibus eros sed urna mattis rhoncus. Sed et purus molestie lorem aliquam porta.

Morbi et nisl id justo vulputate euismod. Duis vel diam vel lorem dictum varius. Nunc facilisis tellus sed tincidunt interdum. Etiam vitae bibendum lorem. Vestibulum vel sem et sem eleifend euismod at egestas elit. Maecenas vel fringilla neque. Nam viverra vitae justo non efficitur. Nam sollicitudin feugiat sapien, eu ornare nisl sodales id. Mauris ut risus in nunc pretium pellentesque. Nulla eget dictum felis, vitae elementum lorem. Integer in sem nulla. Etiam ac euismod lorem. Quisque dignissim ex urna, ac facilisis dolor pharetra eget. Curabitur tincidunt luctus orci vel consequat.";
    $result['anchor'] = "n_1-lorem-ipsum";
    
    echo json_encode($result);
}

?>