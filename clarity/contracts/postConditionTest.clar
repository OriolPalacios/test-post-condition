
;; title: postConditionTest
;; version:
;; summary:
;; description: 

;; traits
;;


;; token definitions
;;

;; constants
;;

;; data vars
;;

;; data maps
;;

(define-map Donors principal uint )

;; public functions
;;

(define-public (donate (amount uint)) 
    (begin 
        (asserts! (>= amount u3000) (err u101))
        (map-set Donors tx-sender (+ (get-donate-amount tx-sender) amount))
        (stx-transfer? (+ amount u5000) tx-sender (as-contract tx-sender))
    )
)

;; read only functions
;;
(define-read-only (get-donate-amount (who principal)) 
    (default-to u0 (map-get? Donors who))
)
;; private functions
;;

