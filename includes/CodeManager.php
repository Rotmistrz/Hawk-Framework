<?php

class CodeManager {
    private $directory;

    public function __construct($directory) {
        $this->directory = $directory;
    }

    public function transformFile($filename) {
        $path = $this->directory . "/" . $filename;

        if (is_file($path)) {
            return highlight_file($path, true);
        } else {
            return false;
        }
    }
}

?>