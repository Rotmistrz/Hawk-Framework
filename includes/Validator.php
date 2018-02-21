<?php

class Validator {
    private $errors = [];

    public function __construct() {

    }

    public function longerThan($str, $number, $warning = "undefined-error") {
        if (strlen($str) <= $number) {
            if (!empty($warning)) {
                $this->errors[] = $warning;
            }

            return false;
        }

        return true;
    }

    public function isNumber($str, $warning = "undefined-error") {
        if (preg_match("/^[0-9\s]+$/", $str)) {
            return true;
        } else {
            if (!empty($warning)) {
                $this->errors[] = $warning;
            }

            return false;
        }
    }

    public function isPhoneNumber($str, $warning = "undefined-error") {
        if (preg_match("/^\+?[0-9\s]+$/", $str)) {
            return true;
        } else {
            if (!empty($warning)) {
                $this->errors[] = $warning;
            }

            return false;
        }
    }

    public function isEmail($str, $warning = "undefined-error") {
        if (filter_var($str, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            if (!empty($warning)) {
                $this->errors[] = $warning;
            }
            
            return false;
        }
    }

    public function reportError($warning) {
        $this->errors[] = $warning;
    }

    public function validate() {
        if(count($this->errors) == 0) {
            return true;
        } else {
            return false;
        }
    }

    public function getErrorsAsString() {
        return implode('<br />', $this->errors);
    }
}

?>