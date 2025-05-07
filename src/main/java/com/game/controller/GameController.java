package com.game.controller;

import com.game.entity.Score;
import com.game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")  // CORSの設定
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/score")
    public ResponseEntity<String> saveScore(@RequestParam Integer userId, @RequestParam Integer score) {
        try {
            Score scoreEntity = new Score(userId, score);
            gameService.saveScore(scoreEntity);
            return ResponseEntity.ok("スコアを保存しました");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("スコアの保存に失敗しました: " + e.getMessage());
        }
    }
} 