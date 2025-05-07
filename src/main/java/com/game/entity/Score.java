package com.game.entity;

import java.time.LocalDateTime;

public class Score {
    private Integer userId;
    private Integer score;
    private String gameType;  // 追加
    private LocalDateTime createdAt;

    public Score() {
    }

    public Score(Integer userId, Integer score, String gameType) {  // コンストラクタ修正
        this.userId = userId;
        this.score = score;
        this.gameType = gameType;
    }

    // getter/setter追加
    public String getGameType() {
        return gameType;
    }

    public void setGameType(String gameType) {
        this.gameType = gameType;
    }
    // 既存のgetter/setter
}