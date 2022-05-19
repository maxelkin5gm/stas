package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.CartDao;
import com.github.maxelkin5gm.stas.dto.CartGiveQuery;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart/")
@AllArgsConstructor
public class CartController {
    CartDao cartDao;

    @PostMapping("/give")
    public void give(@RequestParam int stasIndex,
                     @RequestParam String side,
                     @RequestParam int cellNumber,
                     @RequestParam String personnelNumber,
                     @RequestBody List<CartGiveQuery> cart) {
        cartDao.give(stasIndex, side, cellNumber, personnelNumber, cart);
    }
}
