export interface Savings {
	SavingID: string;
	GroupID: string;
	CustomerID: string;
	ProductID: string;
	SavingsTypeID: string;
	MpesaTransactionID: string;
	Amount: string;
	PaymentReference: string;
	DateCreated: Date;
	DatePaid: string;
	LastUpdatedOn: string;
	Status: string;
	AMountPaid: string;
	PaymentBalance: string;
	BalanceType: string;
	TransactionType: string;
}

export interface GetSavingsRequest {
	CustomerID: string;
	GroupID: string;
	ProductID: string;
}

export interface CreateSavingsRequest {
	GroupID: string;
	CustomerID: string;
	ProductID: string;
	SavingsType: string;
	ReceiptNo: string;
	Amount: string;
	PaymenyReference: string;
	Status: string;
}
