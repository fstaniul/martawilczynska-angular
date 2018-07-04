<?php

class Database {
  private $host = 'localhost:3306';
  private $dbname = 'martawilczynska_db';
  private $username = 'martawilczynska_db_user';
  private $password = '5ZOhziZyZiFHd8fB';
  private $charset = 'utf8mb4';

  private $conn;

  protected function __construct() {
    $this->conn = null;
  }

  public static function create() {
    $instance = new self();
    return $instance;
  }

  public function createConnection() {
    $this->conn = null;
    try {
      $options = [
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
      ];
      $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=$this->charset", $this->username, $this->password, $options);
      return $this;
    } catch (PDOExcetion $e) {
      return null;
    }
  }

  public function closeConnection() {
    $this->conn = null;
  }

  public function getConnection() {
    return $this->conn;
  }
}