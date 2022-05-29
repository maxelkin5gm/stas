package com.github.maxelkin5gm.stas.controllers;

import com.github.maxelkin5gm.stas.dao.CartDao;
import com.github.maxelkin5gm.stas.dto.CartGiveQueryDto;
import com.github.maxelkin5gm.stas.services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart/")
@AllArgsConstructor
public class CartController {

    CartService cartService;
    CartDao cartDao;

    @PostMapping("/give")
    public void give(@RequestParam int stasIndex,
                     @RequestParam String side,
                     @RequestParam int cellNumber,
                     @RequestParam String personnelNumber,
                     @RequestBody List<CartGiveQueryDto> cart) {
        cartService.give(stasIndex, side, cellNumber, personnelNumber, cart);
    }

    @PostMapping("/take")
    public void take(@RequestParam String nameSto,
                     @RequestParam int amount,
                     @RequestParam String nameDetail,
                     @RequestParam String operationNumber,
                     @RequestParam int stasIndex,
                     @RequestParam String side,
                     @RequestParam int cellNumber,
                     @RequestParam String personnelNumber) {
        cartService.take(nameSto, amount, nameDetail, operationNumber, stasIndex, side, cellNumber, personnelNumber);
    }

    @GetMapping("/findAllMatchStoBy")
    public List<Map<String, Object>> findAllMatchStoBy(@RequestParam int stasIndex,
                                                       @RequestParam String side,
                                                       @RequestParam int cellNumber,
                                                       @RequestParam String personnelNumber) {
        return cartDao.findAllMatchStoBy(stasIndex, side, cellNumber, personnelNumber);
    }
}
