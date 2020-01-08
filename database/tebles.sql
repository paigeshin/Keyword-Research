CREATE TABLE `diet` (
    keyword VARCHAR(255) NOT NULL,
    ad_group VARCHAR(50) NOT NULL DEFAULT "not grouped",
    search_volume INT NOT NULL DEFAULT 0,
    competition FLOAT NOT NULL DEFAULT 0,
    bid_usd FLOAT NOT NULL DEFAULT 0,
    resource VARCHAR(11) NOT NULL,
    PRIMARY KEY(keyword)
);