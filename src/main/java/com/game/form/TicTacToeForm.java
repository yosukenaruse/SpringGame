package com.game.form;

import jakarta.validation.constraints.NotNull;

public class TicTacToeForm {
    @NotNull(message = "ユーザーIDは必須です")
    private Integer userId;

    @NotNull(message = "ボードの結果は必須です")
    private String boardResult;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getBoardResult() {
        return boardResult;
    }

    public void setBoardResult(String boardResult) {
        this.boardResult = boardResult;
    }
} 