import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Inset,
  Link,
  Separator,
  Strong,
  Text,
  TextArea,
  TextField,
  Theme,
} from "@radix-ui/themes";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CalendarIcon,
  CrumpledPaperIcon,
  FontBoldIcon,
  FontItalicIcon,
  ImageIcon,
  InstagramLogoIcon,
  MagicWandIcon,
  MagnifyingGlassIcon,
  RulerHorizontalIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const TempLayout = ({ focusable = true }) => {
  const tabIndex = focusable ? undefined : -1;

  const [portalContainer, setPortalContainer] = useState(null);

  const [state, setState] = useState({
    sneakersBookmarked: false,
    jeansBookmarked: false,
    delivery: "",
    size: "9",
    material: "",
    color: "",
    productMaterial: "",
    productColor: "",
    productSizes: [],
  });

  return (
    <Card size="1">
      <Flex mb="2" position="relative">
        <img
          width="280"
          height="270"
          src="https://images.unsplash.com/photo-1577210897949-1f56f943bf82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=560&h=540&q=80&crop=bottom"
          style={{ borderRadius: "var(--radius-1)" }}
        />

        <Theme appearance="light" asChild>
          <Flex
            align="center"
            justify="center"
            position="absolute"
            bottom="0"
            right="0"
            width="32px"
            height="32px"
            style={{ borderRadius: "53px" }}
            m="2"
          >
            <IconButton
              size="2"
              tabIndex={tabIndex}
              color="gray"
              variant="ghost"
              highContrast={state.jeansBookmarked}
              onClick={() =>
                setState((currentState) => ({
                  ...currentState,
                  jeansBookmarked: !currentState.jeansBookmarked,
                }))
              }
            >
              {state.jeansBookmarked ? (
                <BookmarkFilledIcon />
              ) : (
                <BookmarkIcon />
              )}
            </IconButton>
          </Flex>
        </Theme>
      </Flex>

      <Flex align="end" justify="between" mb="2">
        <Box>
          <Flex mb="1">
            <Link
              href="#"
              underline="hover"
              tabIndex={tabIndex}
              highContrast
              size="2"
              color="gray"
              onClick={(e) => e.preventDefault()}
            >
              Pants and jeans
            </Link>
          </Flex>

          <Heading as="h3" size="3">
            Jeans #7
          </Heading>
        </Box>

        <Text as="div" size="6" weight="bold">
          $149
        </Text>
      </Flex>

      <Text as="p" size="2" color="gray" mb="4">
        Jeans with a sense of nostalgia, as if they carry whispered tales of
        past adventures.
      </Text>

      <Box>
        <Separator size="4" my="4" />
      </Box>

      <Flex gap="2" align="end">
        <Flex direction="column" flexGrow="1">
          <Label asChild>
            <Text size="1" color="gray" mb="1">
              Color
            </Text>
          </Label>

          <Select>
            <SelectTrigger tabIndex={tabIndex} variant="soft" />
            <SelectContent
              variant="soft"
              container={portalContainer}
              position="popper"
            >
              <SelectItem value="Lighter">Lighter</SelectItem>
              <SelectItem value="Darker">Darker</SelectItem>
            </SelectContent>
          </Select>
        </Flex>

        <Flex direction="column">
          <Label asChild>
            <Text size="1" color="gray" mb="1">
              Size
            </Text>
          </Label>

          <Select>
            <SelectTrigger tabIndex={tabIndex} variant="soft" />
            <SelectContent
              variant="soft"
              container={portalContainer}
              position="popper"
            >
              {Array.from({ length: 17 }, (_, i) => (
                <SelectItem key={i} value={String(i + 24)}>
                  {i + 24}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Flex>

        <Button tabIndex={tabIndex} highContrast>
          Add to cart
        </Button>
      </Flex>
    </Card>
  );
};

export default TempLayout;
