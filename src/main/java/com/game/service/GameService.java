package com.game.service;

import com.game.entity.Score;
import com.game.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    @Autowired
    private ScoreRepository scoreRepository;

    public void saveScore(Score score) {
        scoreRepository.saveScore(score);
    }
} 