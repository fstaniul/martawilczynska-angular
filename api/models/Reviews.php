<?php

class Reviews {
  private $TABLE_NAME = 'reviews';

  private $conn;

  public function __construct(PDO $conn) {
    $this->conn = $conn;
  }

  public function get(int $id) {
    try {
      $stmt = $this->conn->prepare("SELECT * FROM $this->TABLE_NAME WHERE id = :id");
      $stmt->execute([':id' => $id]);
      $result = $stmt->fetch();
      $stmt->close();
      return $result;
    } catch (PDOException $e) {
      return null;
    }
  }

  public function getAll(int $limit, int $offset) {
    if (!isset($limit) || $limit <= 0) $limit = 10;
    if ($offset < 0) $offset = 0;
    try {
      $stmt = $this->conn->prepare("SELECT * FROM $this->TABLE_NAME ORDER BY createdAt DESC LIMIT :limit OFFSET :offset");
      $stmt->execute([':limit' => $limit, ':offset' => $offset]);
      $result = $stmt->fetchAll();
      $stmt->close();
      return $result;
    } catch (PDOException $e) {
      return null;
    }
  }

  public function create(string $author, string $message, int $score, bool $hidden) {
    try {
      $stmt = $this->conn->prepare("INSERT INTO $this->TABLE_NAME (author, message, score, createdAt, updatedAt, hidden) VALUES (:author, :message, :score, NOW(), NOW(), :hidden)");
      $stmt->execute([':author' => $author, ':message' => $message, ':score' => $score, ':hidden' => $hidden]);
      $id = $stmt->lastInsertId();
      $stmt->close();
      return $this->get($id);
    } catch (PDOException $e) {
      return null;
    }
  }

  public function delete (int $id) {
    try {
      $stmt = $this->conn->prepare("DELETE FROM $this->TABLE_NAME WHERE id = :id");
      $stmt->execute([':id' => $id]);
      $stmt->close();
      return true;
    } catch (PDOException $e) {
      return false;
    }
  }
}

class Review {
  private $id;
  private $author;
  private $message;
  private $score;
  private $createdAt;
  private $updatedAt;
  private $hidden;

  protected function __construct() {
  }

  public function asArray() {
    return array('id' => $this->id, 'author' => $this->author, 'message' => $this->message, 'score' => $this->score, 'createdAt' => $this->createdAt, 'updatedAt' => $this->updatedAt, 'hidden' => $this->hidden);
  }
  
  public function getId()
  {
    return $this->id;
  }

  public function setId(int $id)
  {
    $this->id = $id;
    return $this;
  }

  public function getAuthor()
  {
    return $this->author;
  }

  public function setAuthor(string $author)
  {
    $this->author = $author;
    return $this;
  }

  public function getMessage()
  {
    return $this->message;
  }

  public function setMessage(string $message)
  {
    $this->message = $message;
    return $this;
  }

  public function getScore()
  {
    return $this->score;
  }

  public function setScore(int $score)
  {
    $this->score = $score;
    return $this;
  }

  public function getCreatedAt()
  {
    return $this->createdAt;
  }

  public function setCreatedAt(string $createdAt)
  {
    $this->createdAt = $createdAt;
    return $this;
  }

  public function getUpdatedAt()
  {
    return $this->updatedAt;
  }

  public function setUpdatedAt(string $updatedAt)
  {
    $this->updatedAt = $updatedAt;
    return $this;
  }

  public function getHidden()
  {
    return $this->hidden;
  }

  public function setHidden(bool $hidden)
  {
    $this->hidden = $hidden;
    return $this;
  }
}