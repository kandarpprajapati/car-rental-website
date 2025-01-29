import { Table } from "@radix-ui/themes";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useGetUserBookings } from "../../hooks/bookings/useGetUserBookings";
import { useTranslation } from "react-i18next";

const OrdersPage = () => {
  const { t, i18n } = useTranslation("translation", { keyPrefix: "orders" });
  const { data: bookings, isFetching, isLoading, error } = useGetUserBookings();

  const loading = isFetching || isLoading;

  useEffect(() => console.log(bookings), [bookings]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Card className="max-w-[90%] lg:w-fit lg:max-w-[80%] mx-auto my-8 shadow-lg rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">
            {t("heading")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md shadow-md">
                <p>{error.message || t("errorMessage")}</p>
              </div>
            </div>
          ) : (
            <Table.Root
              variant="surface"
              className="w-full text-sm text-slate-700 md:flex md:justify-center"
              layout="auto"
            >
              <Table.Header className="bg-slate-200">
                <Table.Row>
                  <Table.ColumnHeaderCell className="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider">
                    {t("table.bookingDate")}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider">
                    {t("table.productName")}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider">
                    {t("table.timeSlots")}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider">
                    {t("table.from")}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider">
                    {t("table.to")}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell className="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider">
                    {t("table.totalPrice")}
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {loading && (
                  <Table.Row>
                    <Table.RowHeaderCell
                      colSpan={6}
                      className="text-center py-4 text-slate-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="loader rounded-full border-t-4 border-secondary border-solid h-16 w-16 animate-spin"></div>
                        <p
                          className={`mt-4 font-medium text-primary-foreground`}
                        >
                          {t("table.loadingMessage")}
                        </p>
                      </div>
                    </Table.RowHeaderCell>
                  </Table.Row>
                )}
                {bookings &&
                  bookings.length > 0 &&
                  bookings.map((booking) => (
                    <Table.Row
                      key={booking._id}
                      className="hover:bg-gray hover:text-white transition duration-200"
                    >
                      <Table.RowHeaderCell className="px-6 py-4">
                        {new Date(booking.date).toLocaleDateString()}
                      </Table.RowHeaderCell>
                      <Table.Cell className="px-6 py-4">
                        {booking.productId?.name || "N/A"}
                      </Table.Cell>
                      <Table.Cell className="px-6 py-4">
                        {booking?.time.map(
                          (time, index) =>
                            `${time} ${
                              index + 1 < booking.time.length ? "," : ""
                            }`
                        )}
                      </Table.Cell>
                      <Table.Cell className="px-6 py-4">
                        {booking?.deliveryFrom}
                      </Table.Cell>
                      <Table.Cell className="px-6 py-4">
                        {booking?.deliveryTo}
                      </Table.Cell>
                      <Table.Cell className="px-6 py-4">
                        {booking?.totalPrice} €
                      </Table.Cell>
                    </Table.Row>
                  ))}
                {bookings && bookings.length === 0 && (
                  <Table.Row>
                    <Table.RowHeaderCell
                      colSpan={6}
                      className="text-center py-4 text-slate-500"
                    >
                      {t("table.noDataMessage")}
                    </Table.RowHeaderCell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
