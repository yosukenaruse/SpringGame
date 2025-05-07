package com.game.repository;

import com.game.entity.Score;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScoreRepository {
    void saveScore(Score score);
} 