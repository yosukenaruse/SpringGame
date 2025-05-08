package com.game.entity;

import java.time.LocalDateTime;

public class TicTacToe {
    private Integer userId;
    private LocalDateTime createdAt;
    private String boardResult;

    public TicTacToe() {
    }

    public TicTacToe(Integer userId, String boardResult) {
        this.userId = userId;
        this.boardResult = boardResult;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getBoardResult() {
        return boardResult;
    }

    public void setBoardResult(String boardResult) {
        this.boardResult = boardResult;
    }
} 