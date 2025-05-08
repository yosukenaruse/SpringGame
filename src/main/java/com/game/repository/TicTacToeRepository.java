package com.game.repository;

import com.game.entity.TicTacToe;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TicTacToeRepository {
    void insert(TicTacToe ticTacToe);
} 