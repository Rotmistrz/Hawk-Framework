<?php

require_once 'includes/hawk-config.php';
require_once 'includes/Language.php';
require_once 'includes/Validator.php';

require_once 'includes/phpmailer/PHPMailer.php';
require_once 'includes/phpmailer/SMTP.php';
require_once 'includes/phpmailer/PHPMailerAutoload.php';

$resultMessages = [
    Language::PL => [
        'sent' => "Twoja wiadomość została pomyślnie wysłana.",
        'sending-error' => "Wystąpił problem podczas wysyłania wiadomości. Proszę spróbować ponownie za chwilę.",
        'incorrect-email' => "Proszę podać poprawny adres e=mail.",
        'incorrect-phone-number' => "Proszę podać poprawny numer telefonu.",
        'any-field-incorrect' => "Proszę wypełnić poprawnie wszystkie wymagane pola.",
        'empty-name' => "Proszę się przedstawić.",
        'empty-message' => "Proszę wpisać wiadomość."
    ],
    Language::EN => [
        'sent' => "Your message has been correctly sent.",
        'sending-error' => "Wystąpił problem podczas wysyłania wiadomości. Proszę spróbować ponownie za chwilę.",
        'incorrect-email' => "Proszę podać poprawny adres e=mail.",
        'incorrect-phone-number' => "Proszę podać poprawny numer telefonu.",
        'any-field-incorrect' => "Proszę wypełnić poprawnie wszystkie wymagane pola.",
        'empty-name' => "Proszę się przedstawić.",
        'empty-message' => "Proszę wpisać wiadomość."
    ]
];

if($_POST['action'] == 'load-overlayer') {
    sleep(2);

    header('Content-type: application/json');
    
    $result['html'] = "
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a pretium neque. Donec ut tortor sed justo dictum sollicitudin congue ac mi. Pellentesque convallis nunc quis tincidunt mattis. Phasellus eget neque posuere, imperdiet nisi at, aliquet purus. Proin a mollis sapien, non tristique nisi. Aenean in est viverra, egestas nisl a, malesuada magna. Vestibulum ac ante rutrum, mollis lacus ac, mollis dolor. Aenean eget tempor nulla. Maecenas posuere mollis bibendum. Nunc faucibus eros sed urna mattis rhoncus. Sed et purus molestie lorem aliquam porta.

Morbi et nisl id justo vulputate euismod. Duis vel diam vel lorem dictum varius. Nunc facilisis tellus sed tincidunt interdum. Etiam vitae bibendum lorem. Vestibulum vel sem et sem eleifend euismod at egestas elit. Maecenas vel fringilla neque. Nam viverra vitae justo non efficitur. Nam sollicitudin feugiat sapien, eu ornare nisl sodales id. Mauris ut risus in nunc pretium pellentesque. Nulla eget dictum felis, vitae elementum lorem. Integer in sem nulla. Etiam ac euismod lorem. Quisque dignissim ex urna, ac facilisis dolor pharetra eget. Curabitur tincidunt luctus orci vel consequat.";
    $result['anchor'] = "n_1-lorem-ipsum";
    
    echo json_encode($result);
} else if ($_POST['action'] == 'load-more-content') {
    header('Content-type: application/json');

    $html = "<div class=\"exemplary\">Hop hop lorem ipsum exemplary items</div>";
    $html .= "<div class=\"exemplary\">Hop hop lorem ipsum exemplary items</div>";
    $html .= "<div class=\"exemplary\">Hop hop lorem ipsum exemplary items</div>";

    if ($_POST['lastItemId'] < 3) {
        $lastItemId = 3;
        $done = false;
    } else {
        $done = true;
        $lastItemId = 3;
    }

    $json = [];
    $json['html'] = $html;
    $json['lastItemId'] = $lastItemId;
    $json['isDone'] = $done;

    echo json_encode($json);
} else if($_POST['action'] == 'send-opinion') {
    header('Content-type: application/json');

    if (isset($_POST['lang'])) {
        $lang = $_POST['lang'];
    } else {
        $lang = Language::PL;
    }

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = nl2br(htmlspecialchars(trim($_POST['message'])));
    $generalOpinion = (isset($_POST['general-opinion'])) ? $_POST['general-opinion'] : false;
    $noteValues = (isset($_POST['note'])) ? $_POST['note'] : false;
    $note = "";

    $errorFields = [];

    $Validator = new Validator();

    if (!$Validator->longerThan($name, 1)) {
        $errorFields[] = 'name';
    }

    if (!empty($email) && !$Validator->isEmail($email)) {
        $errorFields[] = 'email';
    }

    if (!$generalOpinion) {
        $errorFields[] = 'general-opinion';
        $Validator->reportError('general-opinion');
    }

    if (!$noteValues) {
        $errorFields[] = 'note';
        $Validator->reportError('note');
    } else {
        $note = implode('<br />', $noteValues);
    }

    $json['errorFields'] = $errorFields;

    if ($Validator->validate()) {
        $mail = "<!DOCTYPE html>\n";
        $mail .= "<html lang=\"pl\">\n\t";
        $mail .= "<head>\n\t\t";
        $mail .= "<meta charset=\"utf-8\" />\n\t";
        $mail .= "</head>\n\t";
        $mail .= "<body style=\"font-family: Verdana, Arial, sans-serif; font-size: 12px;\">\n\t\t";

        $mail .= "<h1 style=\"font-family: 'Times New Roman', Georgia, serif; font-weight: normal; font-size: 18px; padding: 0 0 20px 0;\">Wiadomość wysłana za pomocą formularza na stronie www</h1>\n\t\t";
        $mail .= "<p><b>Od:</b> ".$name."</p>\n\t\t";
        $mail .= "<p><b>E-mail:</b> ".$email."</p>\n\t\t";
        $mail .= "<p><b>Ogólna opinia:</b> ".$generalOpinion."</p>\n\t\t";
        $mail .= "<p><b>Ocena:</b> ".$note."</p>\n\t\t";
        $mail .= "<p><b>Treść wiadomości:</b></p>\n\t\t";
        $mail .= "<p>".$message."</p>";

        $mail .= "</body>\n";
        $mail .= "</html>";
        
        $emailSubject = "Wiadomość ze strony";

        $Mailer = new PHPMailer();    //utworzenie nowej klasy phpmailer
        $Mailer->From = MAILER_FROM;    //Pełny adres e-mail
        $Mailer->FromName = "WWW";    //imię i nazwisko lub nazwa użyta do wysyłania wiadomości
        $Mailer->Host = MAILER_HOST;    //adres serwera SMTP wysyłającego e-mail
        $Mailer->Mailer = "smtp";    //do wysłania zostanie użyty serwer SMTP
        $Mailer->SMTPAuth = true;    //włączenie autoryzacji do serwera SMTP
        $Mailer->SMTPSecure = "ssl";
        $Mailer->Username = MAILER_USERNAME;    //nazwa użytkownika do skrzynki e-mail
        $Mailer->Password = MAILER_PASSWORD;    //hasło użytkownika do skrzynki e-mail
        $Mailer->Port = 465; //port serwera SMTP
        $Mailer->isHTML(true);
        $Mailer->CharSet = "UTF-8";
        $Mailer->Subject = $emailSubject;    //Temat wiadomości, można stosować zmienne i znaczniki HTML
        $Mailer->Body = $mail;    //Treść wiadomości, można stosować zmienne i znaczniki HTML 
        $Mailer->SMTPAutoTLS = false;   //wyłączenie TLS
        $Mailer->AddAddress("filip.markiewicz96@gmail.com");

        if($Mailer->Send()) {
            $json['error'] = false;
            $json['message'] = $resultMessages[$lang]['sent'];
        }
        else {
            $json['error'] = true;
            $json['message'] = $resultMessages[$lang]['sending-error'];
        }
    } else {
        $json['error'] = true;
        $json['message'] = $resultMessages[$lang]['any-field-incorrect'];
    }
    
    echo json_encode($json);
}

?>