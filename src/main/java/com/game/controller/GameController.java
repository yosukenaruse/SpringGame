package com.game.controller;

import com.game.entity.Score;
import com.game.entity.TicTacToe;
import com.game.form.ScoreForm;
import com.game.form.TicTacToeForm;
import com.game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")  // CORSの設定
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/score")
    public ResponseEntity<String> saveScore(@Valid @RequestBody ScoreForm scoreForm) {
        try {
            Score scoreEntity = new Score(scoreForm.getUserId(), scoreForm.getScore(), scoreForm.getGameType());
            gameService.saveScore(scoreEntity);
            return ResponseEntity.ok("スコアを保存しました");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("スコアの保存に失敗しました: " + e.getMessage());
        }
    }

    @PostMapping("/tic-tac-toe")
    public ResponseEntity<String> saveTicTacToeResult(@Valid @RequestBody TicTacToeForm ticTacToeForm) {
        try {
            TicTacToe ticTacToe = new TicTacToe(ticTacToeForm.getUserId(), ticTacToeForm.getBoardResult());
            gameService.saveTicTacToeResult(ticTacToe);
            return ResponseEntity.ok("マルバツゲームの結果を保存しました");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("マルバツゲームの結果の保存に失敗しました: " + e.getMessage());
        }
    }
} 