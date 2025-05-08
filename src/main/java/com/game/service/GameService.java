package com.game.service;

import com.game.entity.Score;
import com.game.entity.TicTacToe;
import com.game.repository.ScoreRepository;
import com.game.repository.TicTacToeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private TicTacToeRepository ticTacToeRepository;

    public void saveScore(Score score) {
        scoreRepository.saveScore(score);
    }

    public void saveTicTacToeResult(TicTacToe ticTacToe) {
        ticTacToeRepository.insert(ticTacToe);
    }
} 