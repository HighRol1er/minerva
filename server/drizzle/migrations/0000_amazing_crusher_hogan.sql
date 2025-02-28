CREATE TABLE "exchange_binance" (
	"currency_pair" varchar(20) PRIMARY KEY NOT NULL,
	"base_asset" varchar(10) NOT NULL,
	"quote_asset" varchar(10) NOT NULL,
	"trade_status" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exchange_bithumb" (
	"currency_pair" varchar(20) PRIMARY KEY NOT NULL,
	"korean_name" varchar(20) NOT NULL,
	"english_name" varchar(50) NOT NULL,
	"base_asset" varchar(10) NOT NULL,
	"quote_asset" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exchange_bybit" (
	"currency_pair" varchar(20) PRIMARY KEY NOT NULL,
	"base_asset" varchar(10) NOT NULL,
	"quote_asset" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exchange_coinbase" (
	"currency_pair" varchar(20) PRIMARY KEY NOT NULL,
	"base_asset" varchar(10) NOT NULL,
	"quote_asset" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forex_rates" (
	"id" serial PRIMARY KEY NOT NULL,
	"currency_pair" varchar(10) NOT NULL,
	"timestamp" timestamp NOT NULL,
	"rate" numeric(10, 4) NOT NULL,
	CONSTRAINT "forex_rates_currency_pair_unique" UNIQUE("currency_pair")
);
--> statement-breakpoint
CREATE TABLE "exchange_kraken" (
	"currency_pair" varchar(20) PRIMARY KEY NOT NULL,
	"wsname" varchar(30) NOT NULL,
	"base_asset" varchar(10) NOT NULL,
	"quote_asset" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exchange_okx" (
	"currency_pair" varchar(20) PRIMARY KEY NOT NULL,
	"base_asset" varchar(10) NOT NULL,
	"quote_asset" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exchange_upbit" (
	"currency_pair" varchar(20) PRIMARY KEY NOT NULL,
	"korean_name" varchar(20) NOT NULL,
	"english_name" varchar(50) NOT NULL,
	"base_asset" varchar(10) NOT NULL,
	"quote_asset" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
