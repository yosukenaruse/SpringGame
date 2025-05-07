package com.game.form;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

public class ScoreForm {
    @NotNull(message = "ユーザーIDは必須です")
    @Min(value = 1, message = "ユーザーIDは1以上である必要があります")
    private Integer userId;

    @NotNull(message = "スコアは必須です")
    @Min(value = 0, message = "スコアは0以上である必要があります")
    private Integer score;

    @NotNull(message = "ゲームタイプは必須です")
    private String gameType;

    // デフォルトコンストラクタ
    public ScoreForm() {
    }

    // ゲッターとセッター
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getGameType() {
        return gameType;
    }

    public void setGameType(String gameType) {
        this.gameType = gameType;
    }
} 