type Operation = {
  operation: "buy" | "sell";
  "unit-cost": number;
  quantity: number;
};

export default Operation;
